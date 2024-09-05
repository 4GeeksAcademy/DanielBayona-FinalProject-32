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
    role = db.Column(Enum(roleEnum), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.username}>'

    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
            "role" : self.role
            # do not serialize the password, its a security breach
        }

class Worker(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    lastName = db.Column(db.String(50), nullable=False)
    position = db.Column(db.String(60), nullable=False)
    mail = db.Column(db.String(254), nullable=False, unique=True)
    phone = db.Column(db.Integer, nullable=False, unique=True)
    adress = db.Column(db.String(254), nullable=False)
    identification = db.Column(db.Integer, nullable=False)
    username = db.Column(db.String(16), db.ForeignKey("user.username"), unique=True,nullable=False)
    username_table = db.relationship("User", backref="worker")
    performance = db.Column(db.String(254), nullable=False)

class Supervisor(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    lastName = db.Column(db.String(50), nullable=False)
    position = db.Column(db.String(60), nullable=False)
    mail = db.Column(db.String(254), nullable=False, unique=True)
    phone = db.Column(db.Integer, nullable=False, unique=True)
    adress = db.Column(db.String(254), nullable=False)
    identification = db.Column(db.Integer, nullable=False)
    username = db.Column(db.String(16), db.ForeignKey("user.username"), unique=True,nullable=False)
    username_table = db.relationship("User", backref="supervisor")

class Administrator(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    lastName = db.Column(db.String(50), nullable=False)
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

class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name= db.Column(db.String(50), nullable=False)
    desc= db.Column(db.String, nullable=False)
    proof = db.Column(db.String, nullable=False)
    review = db.Column(db.String(254))
    status = db.Column(db.String(254), nullable=False)
    workerId = db.Column(db.Integer, db.ForeignKey("worker.id"), nullable=False)
    worker_table = db.relationship("Worker", backref="task")
    supervisorId = db.Column(db.Integer, db.ForeignKey("supervisor.id"), nullable=False)
    supervisor_table = db.relationship("Supervisor", backref="task")
    company = db.Column(db.Integer, db.ForeignKey("company.id"), nullable=False, unique=True)
    company_table = db.relationship("Company", backref="task")

class Issue(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name= db.Column(db.String(50), nullable=False)
    desc= db.Column(db.String, nullable=False)
    proof = db.Column(db.String, nullable=False)
    review = db.Column(db.String)
    status = db.Column(db.String, nullable=False)
    adminId = db.Column(db.Integer, db.ForeignKey("administrator.id"), nullable=False)
    administrator_table = db.relationship("Administrator", backref="issue") 
    workerId = db.Column(db.Integer, db.ForeignKey("worker.id"))
    worker_table = db.relationship("Worker", backref="issue") 
    supervisorId = db.Column(db.Integer, db.ForeignKey("supervisor.id"))
    supervisor_table = db.relationship("Supervisor", backref="issue") 