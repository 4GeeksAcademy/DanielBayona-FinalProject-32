"""empty message

Revision ID: ef5217723bc8
Revises: 
Create Date: 2024-09-06 18:19:29.401062

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ef5217723bc8'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('company',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=50), nullable=False),
    sa.Column('mail', sa.String(length=254), nullable=False),
    sa.Column('phone', sa.Integer(), nullable=False),
    sa.Column('adress', sa.String(length=254), nullable=False),
    sa.Column('identification', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('mail'),
    sa.UniqueConstraint('phone')
    )
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=16), nullable=False),
    sa.Column('password', sa.String(length=256), nullable=False),
    sa.Column('salt', sa.String(length=256), nullable=False),
    sa.Column('pic', sa.String(length=256), nullable=False),
    sa.Column('role', sa.Enum('worker', 'supervisor', 'administrator', name='roleenum'), nullable=False),
    sa.Column('is_active', sa.Boolean(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('password'),
    sa.UniqueConstraint('pic'),
    sa.UniqueConstraint('salt'),
    sa.UniqueConstraint('username')
    )
    op.create_table('administrator',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=50), nullable=False),
    sa.Column('lastName', sa.String(length=50), nullable=False),
    sa.Column('position', sa.String(length=60), nullable=False),
    sa.Column('mail', sa.String(length=254), nullable=False),
    sa.Column('phone', sa.Integer(), nullable=False),
    sa.Column('adress', sa.String(length=254), nullable=False),
    sa.Column('identification', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=16), nullable=False),
    sa.ForeignKeyConstraint(['username'], ['user.username'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('mail'),
    sa.UniqueConstraint('phone'),
    sa.UniqueConstraint('username')
    )
    op.create_table('supervisor',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=50), nullable=False),
    sa.Column('lastName', sa.String(length=50), nullable=False),
    sa.Column('position', sa.String(length=60), nullable=False),
    sa.Column('mail', sa.String(length=254), nullable=False),
    sa.Column('phone', sa.Integer(), nullable=False),
    sa.Column('adress', sa.String(length=254), nullable=False),
    sa.Column('identification', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=16), nullable=False),
    sa.ForeignKeyConstraint(['username'], ['user.username'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('mail'),
    sa.UniqueConstraint('phone'),
    sa.UniqueConstraint('username')
    )
    op.create_table('worker',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=50), nullable=False),
    sa.Column('lastName', sa.String(length=50), nullable=False),
    sa.Column('position', sa.String(length=60), nullable=False),
    sa.Column('mail', sa.String(length=254), nullable=False),
    sa.Column('phone', sa.Integer(), nullable=False),
    sa.Column('adress', sa.String(length=254), nullable=False),
    sa.Column('identification', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=16), nullable=False),
    sa.Column('performance', sa.String(length=254), nullable=False),
    sa.ForeignKeyConstraint(['username'], ['user.username'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('mail'),
    sa.UniqueConstraint('phone'),
    sa.UniqueConstraint('username')
    )
    op.create_table('issue',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=50), nullable=False),
    sa.Column('desc', sa.String(), nullable=False),
    sa.Column('proof', sa.String(), nullable=False),
    sa.Column('review', sa.String(), nullable=True),
    sa.Column('status', sa.String(), nullable=False),
    sa.Column('adminId', sa.Integer(), nullable=False),
    sa.Column('workerId', sa.Integer(), nullable=True),
    sa.Column('supervisorId', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['adminId'], ['administrator.id'], ),
    sa.ForeignKeyConstraint(['supervisorId'], ['supervisor.id'], ),
    sa.ForeignKeyConstraint(['workerId'], ['worker.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('task',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=50), nullable=False),
    sa.Column('desc', sa.String(), nullable=False),
    sa.Column('proof', sa.String(), nullable=False),
    sa.Column('review', sa.String(length=254), nullable=True),
    sa.Column('status', sa.String(length=254), nullable=False),
    sa.Column('workerId', sa.Integer(), nullable=False),
    sa.Column('supervisorId', sa.Integer(), nullable=False),
    sa.Column('company', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['company'], ['company.id'], ),
    sa.ForeignKeyConstraint(['supervisorId'], ['supervisor.id'], ),
    sa.ForeignKeyConstraint(['workerId'], ['worker.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('company')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('task')
    op.drop_table('issue')
    op.drop_table('worker')
    op.drop_table('supervisor')
    op.drop_table('administrator')
    op.drop_table('user')
    op.drop_table('company')
    # ### end Alembic commands ###