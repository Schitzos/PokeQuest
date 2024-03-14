import {
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
} from 'react-native';

export const handleSubmitSearch = (
  event: NativeSyntheticEvent<TextInputSubmitEditingEventData>,
  handleSearch: (event: string) => void,
) => {
  handleSearch(event.nativeEvent.text);
};

export const resetText = (
  setInputValue: (event: string) => void,
  handleSearch: (event: string) => void,
) => {
  setInputValue('');
  handleSearch('');
};
