from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_login import UserMixin


class Statistic(db.Model, UserMixin):
    __tablename__ = 'statistics'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    character_id = db.Column(db.Integer, nullable=False)
    highest_score = db.Column(db.Integer, nullable=False)
    total_enemies_defeated = db.Column(db.Integer, nullable=False)
    dungeon_levels_traveled = db.Column(db.Integer, nullable=False)
    quests_completed = db.Column(db.Integer, nullable=False)
    potions_used = db.Column(db.Integer, nullable=False)
    bosses_defeated = db.Column(db.Integer, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'character_id': self.character_id,
            'highest_score': self.highest_score,
            'total_enemies_defeated': self.total_enemies_defeated,
            'dungeon_levels_traveled': self.dungeon_levels_traveled,
            'quests_completed': self.quests_completed,
            'potions_used': self.potions_used,
            'bosses_defeated': self.bosses_defeated
        }
