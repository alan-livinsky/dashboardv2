# -*- encoding: utf-8 -*-
"""
Copyright (c) 2019 - present AppSeed.us
"""

from os import environ
from sys import exit
import logging
from app import app


if __name__ == "__main__":
    app.run('127.0.0.1', 5000, debug=True)
