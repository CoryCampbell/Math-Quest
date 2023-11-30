from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_login import UserMixin


class CompletedQuest(db.Model, UserMixin):
    __tablename__ = 'completed_quests'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    character_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("characters.id")), nullable=False)
    quest_id = db.Column(db.Integer, nullable=False)
    quest_name = db.Column(db.String, nullable=False)


    def to_dict(self):
        return {
            'id': self.id,
            'character_id': self.character_id,
            'quest_id': self.quest_id,
            'quest_name': self.quest_name
        }
