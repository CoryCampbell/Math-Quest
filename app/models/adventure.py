from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_login import UserMixin


class Adventure(db.Model, UserMixin):
    __tablename__ = 'adventures'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    character_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("characters.id")), nullable=False)
    score = db.Column(db.Integer, nullable=False)


    def to_dict(self):
        return {
            'id': self.id,
            'character_id': self.character_id,
            'score': self.score
        }
