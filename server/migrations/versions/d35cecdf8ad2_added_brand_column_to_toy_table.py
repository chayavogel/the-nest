"""added brand column to toy table

Revision ID: d35cecdf8ad2
Revises: 929be9e8ebe3
Create Date: 2024-03-21 10:59:16.785238

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd35cecdf8ad2'
down_revision = '929be9e8ebe3'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('toys', schema=None) as batch_op:
        batch_op.add_column(sa.Column('brand', sa.String(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('toys', schema=None) as batch_op:
        batch_op.drop_column('brand')

    # ### end Alembic commands ###
