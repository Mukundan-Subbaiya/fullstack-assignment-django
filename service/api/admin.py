from django.contrib import admin

# Register your models here.
from .models import Artist, Genre, Mood, Track

from .models import Playlist, TrackWrapper

admin.site.register(Artist)
admin.site.register(Genre)
admin.site.register(Mood)
admin.site.register(Track)

admin.site.register(TrackWrapper)
admin.site.register(Playlist)
