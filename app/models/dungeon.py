from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_login import UserMixin


class Dungeon(db.Model, UserMixin):
    __tablename__ = 'dungeons'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    character_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("characters.id")), nullable=False)
    dungeon_id = db.Column(db.Integer, nullable=False)
    dungeon_name = db.Column(db.String, nullable=False)
    score = db.Column(db.Integer, nullable=False)


    def to_dict(self):
        return {
            'id': self.id,
            'character_id': self.character_id,
            'dungeon_id': self.dungeon_id,
            'dungeon_name': self.dungeon_name,
            'score': self.score
        }
