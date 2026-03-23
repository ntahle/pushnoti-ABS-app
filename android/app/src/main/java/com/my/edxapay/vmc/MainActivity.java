package com.my.edxapay.vmc;

import android.os.Build;
import android.os.Bundle;
import android.widget.Toast;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import com.getcapacitor.BridgeActivity;
import com.scottyab.rootbeer.RootBeer;
import android.net.Uri;
import android.media.AudioAttributes;

public class MainActivity extends BridgeActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Initialize RootBeer to check if the device is rooted
        RootBeer rootBeer = new RootBeer(this);
        if (rootBeer.isRooted()) {
            Toast.makeText(this, "This app cannot run on a rooted device.", Toast.LENGTH_LONG).show();
            finish();
        }

        // Continue with the rest of your app's onCreate logic...
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationManager notificationManager = getSystemService(NotificationManager.class);

            // --- Channel 1: Ting Notification ---
            Uri tingUri = Uri.parse("android.resource://" + getPackageName() + "/" + R.raw.ting);
            AudioAttributes audioAttributes = new AudioAttributes.Builder()
                    .setUsage(AudioAttributes.USAGE_NOTIFICATION)
                    .setContentType(AudioAttributes.CONTENT_TYPE_SONIFICATION)
                    .build();

            NotificationChannel channelTing = new NotificationChannel(
                    "notichannel", // Channel ID
                    "Notification Channel", // Channel Name
                    NotificationManager.IMPORTANCE_HIGH
            );
            channelTing.setDescription("This is the main channel used for app notifications.");
            channelTing.enableLights(true);
            channelTing.enableVibration(true);
            channelTing.setShowBadge(true);
            channelTing.setSound(tingUri, audioAttributes);
            notificationManager.createNotificationChannel(channelTing);

            // --- Channel 2: Offline Alarm Notification ---
            Uri offalarmUri = Uri.parse("android.resource://" + getPackageName() + "/" + R.raw.offline);

            NotificationChannel channelOffAlarm = new NotificationChannel(
                    "offlinenoti", // Channel ID
                    "Offline Alarm Notifications", // Channel Name
                    NotificationManager.IMPORTANCE_HIGH
            );
            channelOffAlarm.setDescription("This channel is used for offline alarm notifications.");
            channelOffAlarm.enableLights(true);
            channelOffAlarm.enableVibration(true);
            channelOffAlarm.setShowBadge(true);
            channelOffAlarm.setSound(offalarmUri, audioAttributes);
            notificationManager.createNotificationChannel(channelOffAlarm);


             // --- Channel 3: Online Alarm Notification ---
             Uri onalarmUri = Uri.parse("android.resource://" + getPackageName() + "/" + R.raw.online);

             NotificationChannel channelOnAlarm = new NotificationChannel(
                "onlinenoti", // Channel ID
                "Online Alarm Notifications", // Channel Name
                NotificationManager.IMPORTANCE_HIGH
             );
             channelOnAlarm.setDescription("This channel is used for online alarm notifications.");
             channelOnAlarm.enableLights(true);
             channelOnAlarm.enableVibration(true);
             channelOnAlarm.setShowBadge(true);
             channelOnAlarm.setSound(onalarmUri, audioAttributes);
             notificationManager.createNotificationChannel(channelOnAlarm);


        }
    }
}
