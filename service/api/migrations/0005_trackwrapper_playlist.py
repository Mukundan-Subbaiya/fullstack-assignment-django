# Generated by Django 3.2.13 on 2022-06-11 21:20

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_remove_trackwrapper_playlist'),
    ]

    operations = [
        migrations.AddField(
            model_name='trackwrapper',
            name='playlist',
            field=models.ForeignKey(default=django.utils.timezone.now, on_delete=django.db.models.deletion.CASCADE, to='api.playlist'),
            preserve_default=False,
        ),
    ]