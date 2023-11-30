from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_login import UserMixin


class LeaderboardItem(db.Model, UserMixin):
    __tablename__ = 'leaderboard'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    character_id = db.Column(db.Integer, nullable=False)
    username = db.Column(db.String, nullable=False)
    high_score = db.Column(db.Integer, nullable=False)
    game_type = db.Column(db.String, nullable=False)


    def to_dict(self):
        return {
            'id': self.id,
            'character_id': self.character_id,
            'dungeon_id': self.dungeon_id,
            'dungeon_name': self.dungeon_name,
            'high_score': self.high_score,
            'game_type': self.game_type
        }
