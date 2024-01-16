import React, {useState} from 'react';
import {
  TextInput,
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
  View,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import IconMagnifier from '@assets/icons/icon_magnifier.svg';
import IconClose from '@assets/icons/icon_close.svg';
import theme from '@/theme';

interface SearchInterface {
  handleSearch: (data: string) => void;
  placeholder: string;
}

const Search = ({handleSearch, placeholder}: SearchInterface) => {
  const [inputValue, setInputValue] = useState<string>('');

  const handleSubmitSearch = (
    event: NativeSyntheticEvent<TextInputSubmitEditingEventData>,
  ) => {
    handleSearch(event.nativeEvent.text);
  };

  const resetText = () => {
    setInputValue('');
    handleSearch('');
  };

  return (
    <View style={styles.searchWrapper}>
      <TextInput
        style={styles.search}
        autoCapitalize="none"
        placeholder={placeholder}
        placeholderTextColor={theme.colors.black50}
        value={inputValue}
        onChangeText={text => setInputValue(text)}
        onSubmitEditing={handleSubmitSearch}
      />
      <TouchableOpacity
        style={styles.iconWrapper}
        onPress={() => inputValue === '' || resetText()}
        disabled={inputValue === ''}>
        {inputValue === '' ? (
          <IconMagnifier color={theme.colors.primary} />
        ) : (
          <IconClose color={theme.colors.primary} />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  searchWrapper: {
    backgroundColor: theme.colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 16,
    alignItems: 'center',
    flex: 1,
    paddingVertical: Platform.OS === 'android' ? 6 : 12,
    paddingHorizontal: 16,
    borderColor: theme.colors.primary100,
    borderWidth: 2,
  },
  iconWrapper: {
    opacity: 0.5,
  },
  search: {
    backgroundColor: theme.colors.white,
    color: theme.colors.black,
    fontFamily: theme.font.reguler,
    fontSize: 12,
    flex: 1,
    paddingVertical: 0,
  },
});

export default Search;
