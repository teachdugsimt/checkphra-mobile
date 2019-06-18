package com.infiltech.checkphra;

import android.app.Application;

import com.facebook.react.ReactApplication;

import com.oblador.vectoricons.VectorIconsPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.imagepicker.ImagePickerPackage;
import com.AlexanderZaytsev.RNI18n.RNI18nPackage;
import io.invertase.firebase.RNFirebasePackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import com.smarkets.paypal.RNPaypalPackage;
import com.github.pgengoux.huaweiprotectedapps.HuaweiProtectedAppsPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.dooboolab.RNIap.RNIapPackage;
import com.AlexanderZaytsev.RNI18n.RNI18nPackage;
import fr.bamlab.rnimageresizer.ImageResizerPackage;
import com.imagepicker.ImagePickerPackage;
// import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.AlexanderZaytsev.RNI18n.RNI18nPackage;

import io.invertase.firebase.database.RNFirebaseDatabasePackage;
import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.auth.RNFirebaseAuthPackage;
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage; // <-- Add this line
import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage; // <-- Add this line
// import io.invertase.firebase.firestore.RNFirebaseFirestorePackage;

import com.BV.LinearGradient.LinearGradientPackage;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
// import com.i18n.reactnativei18n.ReactNativeI18n;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

import com.facebook.CallbackManager;
import com.facebook.FacebookSdk;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.facebook.appevents.AppEventsLogger;

import com.crashlytics.android.Crashlytics;
import io.fabric.sdk.android.Fabric;

public class MainApplication extends Application implements ReactApplication {

  private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

  protected static CallbackManager getCallbackManager() {
    return mCallbackManager;
  }

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(//
          new MainReactPackage(),
          // new RNAdMobPackage(),
          // new VectorIconsPackage(),
          // new LinearGradientPackage(),
          // new ImagePickerPackage(),
          // new RNI18nPackage(),
          // new RNFirebasePackage(),
          // new FBSDKPackage(),
          // new ReactNativeConfigPackage(),
          // new RNAdMobPackage(),
          new RNPaypalPackage(), //
          new HuaweiProtectedAppsPackage(), //
          new RNDeviceInfo(), //
          new RNIapPackage(), //
          new ImageResizerPackage(), //
          new ImagePickerPackage(), //
          new FBSDKPackage(mCallbackManager), //
          new RNI18nPackage(), //
          new RNFirebasePackage(), //
          new RNFirebaseAuthPackage(), //
          new RNFirebaseMessagingPackage(), //
          new RNFirebaseNotificationsPackage(), //
          new LinearGradientPackage(), //
          new ReactNativeConfigPackage(), //
          // new ReactNativeI18n(),
          new VectorIconsPackage(),
          // new RNFirebaseFirestorePackage(),
          new RNFirebaseDatabasePackage());
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    Fabric.with(this, new Crashlytics());
    AppEventsLogger.activateApp(this);
    SoLoader.init(this, /* native exopackage */ false);
  }
}
