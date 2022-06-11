from django.contrib import admin
from django.urls import include, path
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register(r"tracks", views.TrackViewSet)
router.register(r"playlists", views.PlaylistViewSet)
# router.register(r"test", views.TestView)


urlpatterns = [
    path("", include(router.urls)),
     path('admin/', admin.site.urls),
]
