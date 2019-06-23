#import <Foundation/Foundation.h>

#import <GoogleMobileAds/GADAdLoader.h>

@protocol GADDelayedAdRenderingDelegate <NSObject>

/// Asks the delegate whether the ad loader should delay rendering the banner ad that it's chosen.
/// If the delegate returns YES, it must also call resumeHandler when it is ready for rendering to
/// resume.
- (BOOL)adLoader:(nonnull GADAdLoader *)adLoader
    shouldDelayRenderingWithResumeHandler:(nonnull dispatch_block_t)resumeHandler;

@end

@interface GADDelayedAdRenderingOptions : GADAdLoaderOptions

/// Delegate for delaying the rendering of Google ads.
@property(nonatomic, nullable, weak) id<GADDelayedAdRenderingDelegate> delegate;

@end
