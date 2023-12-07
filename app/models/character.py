from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_login import UserMixin


class Character(db.Model, UserMixin):
    __tablename__ = 'characters'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    level = db.Column(db.Integer, nullable=False)
    appearance = db.Column(db.Integer, nullable=False)
    difficulty = db.Column(db.String, nullable=False)
    character_name = db.Column(db.String(25), nullable=False)
    max_health = db.Column(db.Integer, nullable=False)
    current_health = db.Column(db.Integer, nullable=False)
    experience_points = db.Column(db.Integer, nullable=False)
    coins = db.Column(db.Integer, nullable=False)

    #relationships
    owned_items = db.relationship('OwnedItem', backref='character', cascade='all, delete')
    adventures = db.relationship('Adventure', backref='character', cascade='all, delete')
    statistics = db.relationship('Statistic', backref='character', cascade='all, delete')
    leaderboard = db.relationship('LeaderboardItem', backref='character', cascade='all, delete')
    quests = db.relationship('Quest', backref='character', cascade='all, delete')
    dungeons = db.relationship('Dungeon', backref='character', cascade='all, delete')


    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'level': self.level,
            'appearance': self.appearance,
            'difficulty': self.difficulty,
            'character_name': self.character_name,
            'max_health': self.max_health,
            'current_health': self.current_health,
            'experience_points': self.experience_points,
            'coins': self.coins
        }
