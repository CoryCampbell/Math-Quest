from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_login import UserMixin


class OwnedItem(db.Model, UserMixin):
    __tablename__ = 'owned_items'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    character_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("characters.id")), nullable=False)
    item_id = db.Column(db.Integer, nullable=False)
    item_type = db.Column(db.String, nullable=False)
    quantity = db.Column(db.Integer, nullable=False)


    def to_dict(self):
        return {
            'id': self.id,
            'character_id': self.character_id,
            'item_id': self.item_id,
            'item_type': self.item_type,
            'quantity': self.quantity
        }
