package com.infiltech.checkphra;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.taessina.paypal.RNPaypalWrapperPackage;
import com.AlexanderZaytsev.RNI18n.RNI18nPackage;
import fr.bamlab.rnimageresizer.ImageResizerPackage;
import com.imagepicker.ImagePickerPackage;
// import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.AlexanderZaytsev.RNI18n.RNI18nPackage;

import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.auth.RNFirebaseAuthPackage;
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage; // <-- Add this line
import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage; // <-- Add this line

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
            new RNPaypalWrapperPackage(), //
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
          new VectorIconsPackage());
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
    AppEventsLogger.activateApp(this);
    SoLoader.init(this, /* native exopackage */ false);
  }
}
