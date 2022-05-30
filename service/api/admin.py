from django.contrib import admin

# Register your models here.
from .models import Artist, Genre, Mood, Track

admin.site.register(Artist)
admin.site.register(Genre)
admin.site.register(Mood)
admin.site.register(Track)