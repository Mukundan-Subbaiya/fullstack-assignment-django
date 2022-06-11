from rest_framework import serializers

from . import models
import uuid


class TrackSerializer(serializers.ModelSerializer):
    genres = serializers.StringRelatedField(many=True)
    moods = serializers.StringRelatedField(many=True)
    main_artists = serializers.StringRelatedField(many=True)
    featured_artists = serializers.StringRelatedField(many=True)

    class Meta:
        model = models.Track
        fields = [
            "id",
            "title",
            "length",
            "bpm",
            "genres",
            "moods",
            "main_artists",
            "featured_artists",
            "audio",
            "cover_art",
            "waveform",
            "spotify",
        ]


class TrackWrapperSerializer(serializers.ModelSerializer):
    track = serializers.CharField(source="track.id")

    def create(self,validated_data):
        print(validated_data)
        track_data = validated_data.pop('track')
        wrapper = models.TrackWrapper.objects.create(**validated_data)
        track = models.Track.objects.get(id=track_data.id)
        wrapper.track = track
        return wrapper

    class Meta:
        model = models.TrackWrapper

        fields = [
            "id",
            "index",
            "track"
        ]


class PlaylistSerializer(serializers.ModelSerializer):

    tracks = TrackWrapperSerializer(many=True)

    class Meta:
        model = models.Playlist

        fields = [
            "id",
            "title",
            "tracks"
        ]

    def create(self, validated_data):
        print(validated_data)
        tracks_data = validated_data.pop('tracks')
        playlist = models.Playlist.objects.create(**validated_data)
        i=0
        for track_data in tracks_data:
            print(track_data['track'])
            track = models.Track.objects.get(id=track_data['track']['id'])
            models.TrackWrapper.objects.create(id=track_data['id'],playlist=playlist,index=i,track=track)
            i+=1
        return playlist
    # to_re