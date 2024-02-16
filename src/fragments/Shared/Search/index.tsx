import React, {useState} from 'react';
import {TextInput, View, TouchableOpacity} from 'react-native';
import IconMagnifier from '@assets/icons/icon_magnifier.svg';
import IconClose from '@assets/icons/icon_close.svg';
import theme from '@/theme';
import {handleSubmitSearch, resetText} from './function';
import {styles} from './styles';
import {SearchInterface} from './type';

const Search = ({handleSearch, placeholder}: SearchInterface) => {
  const [inputValue, setInputValue] = useState<string>('');

  return (
    <View style={styles.searchWrapper}>
      <TextInput
        style={styles.search}
        autoCapitalize="none"
        placeholder={placeholder}
        placeholderTextColor={theme.colors.black50}
        value={inputValue}
        onChangeText={text => setInputValue(text)}
        onSubmitEditing={e => handleSubmitSearch(e, handleSearch)}
      />
      <TouchableOpacity
        style={styles.iconWrapper}
        onPress={() =>
          inputValue === '' || resetText(setInputValue, handleSearch)
        }
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

export default Search;
