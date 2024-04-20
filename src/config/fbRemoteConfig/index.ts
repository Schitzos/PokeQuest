import remoteConfig from '@react-native-firebase/remote-config';

export default function setupRemoteConfig() {
  remoteConfig()
    .setDefaults({
      dashboard_background_image:
        'https://firebasestorage.googleapis.com/v0/b/pokequest-6ad94.appspot.com/o/background_dashboard%2Fbackground-dashboard.png?alt=media&token=9038cf46-fa78-4292-82bc-d9e58d9b003f',
    })
    .then(() => remoteConfig().fetchAndActivate())
    .then(fetchedRemotely => {
      if (fetchedRemotely) {
        console.log('Configs were retrieved from the backend and activated.');
      } else {
        console.log(
          'No configs were fetched from the backend, and the local configs were already activated',
        );
      }
    });
}
