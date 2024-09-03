from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    userId = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(16), unique=True, nullable=False)
    userPassword = db.Column(db.String(256), unique=True, nullable=False)
    userSalt = db.Column(db.String(256), unique=True, nullable=False)
    userPic = db.Column(db.String(256), unique=True, nullable=False)
    userRoleId = db.Column(db.Integer, db.ForeignKey("role.roleId"), nullable=False)
    userRole_table = db.relationship("Role", backref="user")
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.username}>'

    def serialize(self):
        return {
            "id": self.userId,
            "username": self.username,
            "role" : self.userRoleID
            # do not serialize the password, its a security breach
        }

class Role(db.Model):
    roleId = db.Column(db.Integer, primary_key=True)
    roleName = db.Column(db.String(15), unique=True, nullable=False)

class Worker(db.Model):
    workerId = db.Column(db.Integer, primary_key=True)
    workerName = db.Column(db.String(50), nullable=False)
    workerLastName = db.Column(db.String(50), nullable=False)
    workerPosition = db.Column(db.String(60), nullable=False)
    workerMail = db.Column(db.String(254), nullable=False, unique=True)
    workerPhone = db.Column(db.Integer, nullable=False, unique=True)
    workerAdress = db.Column(db.String(254), nullable=False)
    workerIdentification = db.Column(db.Integer, nullable=False)
    workerUsername = db.Column(db.String(16), db.ForeignKey("user.username"), unique=True,nullable=False)
    workerUsername_table = db.relationship("User", backref="worker")
    workerPerformance = db.Column(db.String(254), nullable=False)

class Supervisor(db.Model):
    supervisorId = db.Column(db.Integer, primary_key=True)
    supervisorName = db.Column(db.String(50), nullable=False)
    supervisorLastName = db.Column(db.String(50), nullable=False)
    supervisorPosition = db.Column(db.String(60), nullable=False)
    supervisorMail = db.Column(db.String(254), nullable=False, unique=True)
    supervisorPhone = db.Column(db.Integer, nullable=False, unique=True)
    supervisorAdress = db.Column(db.String(254), nullable=False)
    supervisorIdentification = db.Column(db.Integer, nullable=False)
    supervisorUsername = db.Column(db.String(16), db.ForeignKey("user.username"), unique=True,nullable=False)
    supervisorUsername_table = db.relationship("User", backref="supervisor")

class Administrator(db.Model):
    administratorId = db.Column(db.Integer, primary_key=True)
    administratorName = db.Column(db.String(50), nullable=False)
    administratorLastName = db.Column(db.String(50), nullable=False)
    administratorPosition = db.Column(db.String(60), nullable=False)
    administratorMail = db.Column(db.String(254), nullable=False, unique=True)
    administratorPhone = db.Column(db.Integer, nullable=False, unique=True)
    administratorAdress = db.Column(db.String(254), nullable=False)
    administratorIdentification = db.Column(db.Integer, nullable=False)
    administratorUsername = db.Column(db.String(16), db.ForeignKey("user.username"), unique=True, nullable=False)
    administratorUsername_table = db.relationship("User", backref="administrator")

class Company(db.Model):
    companyId = db.Column(db.Integer, primary_key=True)
    companyName = db.Column(db.String(50), nullable=False, unique=True)
    companyMail = db.Column(db.String(254), nullable=False, unique=True)
    companyPhone = db.Column(db.Integer, nullable=False, unique=True)
    companyAdress = db.Column(db.String(254), nullable=False )
    companyIdentification = db.Column(db.Integer, nullable=False)

class Task(db.Model):
    taskId = db.Column(db.Integer, primary_key=True)
    taskName= db.Column(db.String(50), nullable=False)
    taskDesc= db.Column(db.String, nullable=False)
    taskProof = db.Column(db.String, nullable=False)
    taskReview = db.Column(db.String(254))
    taskStatus = db.Column(db.String(254), nullable=False)
    taskWorkerId = db.Column(db.Integer, db.ForeignKey("worker.workerId"), nullable=False)
    taskWorker_table = db.relationship("Worker", backref="task")
    taskSupervisorId = db.Column(db.Integer, db.ForeignKey("supervisor.supervisorId"), nullable=False)
    taskSupervisor_table = db.relationship("Supervisor", backref="task")
    taskCompany = db.Column(db.String, db.ForeignKey("company.companyName"), nullable=False, unique=True)
    taskCompany_table = db.relationship("Company", backref="task")

class Issue(db.Model):
    issueId = db.Column(db.Integer, primary_key=True)
    issueName= db.Column(db.String(50), nullable=False)
    issueDesc= db.Column(db.String, nullable=False)
    issueProof = db.Column(db.String, nullable=False)
    issueReview = db.Column(db.String)
    issueStatus = db.Column(db.String, nullable=False)
    issueAdminId = db.Column(db.Integer, db.ForeignKey("administrator.administratorId"), nullable=False)
    issueAdministrator_table = db.relationship("Administrator", backref="issue") 
    issueWorkerId = db.Column(db.Integer, db.ForeignKey("worker.workerId"))
    issueWorker_table = db.relationship("Worker", backref="issue") 
    issueSupervisorId = db.Column(db.Integer, db.ForeignKey("supervisor.supervisorId"))
    issueSupervisor_table = db.relationship("Supervisor", backref="issue") 