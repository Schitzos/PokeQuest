import {State} from 'react-native-gesture-handler';

type AnimationHandlers = {
  handleChoosePokemon: () => void;
};

export const handleGestureEvent = (
  event: any,
  handleBallAnimation: (handlers: AnimationHandlers) => void,
  handleChoosePokemon: () => void,
) => {
  if (event.nativeEvent.state === State.END) {
    if (event.nativeEvent.translationY < 0) {
      handleBallAnimation({handleChoosePokemon});
    }
  }
};
