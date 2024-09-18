from flask_sqlalchemy import SQLAlchemy
import enum
from sqlalchemy import Enum

db = SQLAlchemy()

class roleEnum(enum.Enum):
    worker = 'worker'
    supervisor = 'supervisor'
    administrator = 'administrator'

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(16), unique=True, nullable=False)
    password = db.Column(db.String(256), unique=True, nullable=False)
    salt = db.Column(db.String(256), unique=True, nullable=False)
    pic = db.Column(db.String(256), unique=True, nullable=False)
    pic_id = db.Column(db.String(256), unique=True, nullable=False)
    role = db.Column(Enum(roleEnum), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False, default=False)

    def __repr__(self):
        return f'<User {self.username}>'

    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
            "role" : self.role.value
            # do not serialize the password, its a security breach
        }

class Worker(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    position = db.Column(db.String(60), nullable=False)
    mail = db.Column(db.String(254), nullable=False, unique=True)
    phone = db.Column(db.Integer, nullable=False, unique=True)
    adress = db.Column(db.String(254), nullable=False)
    identification = db.Column(db.Integer, nullable=False)
    username = db.Column(db.String(16), db.ForeignKey("user.username"), unique=True,nullable=False)
    username_table = db.relationship("User", backref="worker")
    performance = db.Column(db.Integer, nullable = True)
    def __repr__(self):
        return f'<Worker {self.name} ID: {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "last_name": self.last_name,
            "username": self.username,
            "position": self.position,
            "mail" : self.mail,
            "adress" : self.adress,
            "phone" : self.phone,
            "identification" : self.identification
        }

class Supervisor(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    position = db.Column(db.String(60), nullable=False)
    mail = db.Column(db.String(254), nullable=False, unique=True)
    phone = db.Column(db.Integer, nullable=False, unique=True)
    adress = db.Column(db.String(254), nullable=False)
    identification = db.Column(db.Integer, nullable=False)
    username = db.Column(db.String(16), db.ForeignKey("user.username"), unique=True,nullable=False)
    username_table = db.relationship("User", backref="supervisor")
    def __repr__(self):
        return f'<Supervisor {self.name} ID: {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "last_name": self.last_name,
            "username": self.username,
            "position": self.position,
            "mail" : self.mail,
            "adress" : self.adress,
            "phone" : self.phone,
            "identification" : self.identification
        }

class Administrator(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    position = db.Column(db.String(60), nullable=False)
    mail = db.Column(db.String(254), nullable=False, unique=True)
    phone = db.Column(db.Integer, nullable=False, unique=True)
    adress = db.Column(db.String(254), nullable=False)
    identification = db.Column(db.Integer, nullable=False)
    username = db.Column(db.String(16), db.ForeignKey("user.username"), unique=True,nullable=False)
    username_table = db.relationship("User", backref="administrator")

class Company(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    mail = db.Column(db.String(254), nullable=False, unique=True)
    phone = db.Column(db.Integer, nullable=False, unique=True)
    adress = db.Column(db.String(254), nullable=False)
    identification = db.Column(db.Integer, nullable=False)
    def __repr__(self):
        return f'<Company {self.name} ID: {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "mail" : self.mail,
            "adress" : self.adress,
            "phone" : self.phone,
            "identification" : self.identification
        }

class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name= db.Column(db.String(50), nullable=False)
    work = db.Column(db.String(256))
    work_id = db.Column(db.String(256))
    desc= db.Column(db.String, nullable=False)
    review = db.Column(db.String(254))
    status = db.Column(db.String(254), nullable=False, default="To be reviewed")
    worker_id = db.Column(db.Integer, db.ForeignKey("worker.id"), nullable=False)
    worker_table = db.relationship("Worker", backref="task")
    supervisor_id = db.Column(db.Integer, db.ForeignKey("supervisor.id"))
    supervisor_table = db.relationship("Supervisor", backref="task")
    company = db.Column(db.Integer, db.ForeignKey("company.id"), nullable=False, unique=True)
    company_table = db.relationship("Company", backref="task")

    def __repr__(self):
        return f'<Task: {self.name} ID: {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "desc" : self.desc,
            "worker_id" : self.worker_id,
            "status" : self.status
        }

class Issue(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name= db.Column(db.String(50), nullable=False)
    desc= db.Column(db.String(256), nullable=False)
    proof = db.Column(db.String(256), nullable=False)
    proof_id = db.Column(db.String(256), unique=True, nullable=False)
    review = db.Column(db.String)
    status = db.Column(db.String, nullable=False, default="To Review")
    admin_id = db.Column(db.Integer, db.ForeignKey("administrator.id"), default=1)
    administrator_table = db.relationship("Administrator", backref="issue") 
    user_id =  db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    user_table = db.relationship("User", backref="issue")

    def __repr__(self):
        return f'<Issue: {self.name} ID: {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "desc" : self.desc,
            "user_id" : self.user_id,
            "proof" : self.proof,
            "proof_id" : self.proof_id,
            "status" : self.status
        }