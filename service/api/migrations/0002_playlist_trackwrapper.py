# Generated by Django 3.2.13 on 2022-06-11 17:00

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='TrackWrapper',
            fields=[
                ('id', models.CharField(max_length=10, primary_key=True, serialize=False)),
                ('index', models.IntegerField()),
                ('track', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.track')),
            ],
        ),
        migrations.CreateModel(
            name='Playlist',
            fields=[
                ('id', models.CharField(max_length=10, primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=200)),
                ('tracks', models.ManyToManyField(to='api.TrackWrapper')),
            ],
        ),
    ]