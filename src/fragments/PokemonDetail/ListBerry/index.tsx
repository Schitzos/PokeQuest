import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {getListBerry} from '@/services/berry/berry.service';
import BerryItem from '../BerryItem';
import {TouchableOpacity} from 'react-native-gesture-handler';
import TextView from '@/components/TextView';

export interface ListBerryDataResponse {
  results: any;
  previous: string | null;
  next: string | null;
}
export default function ListBerry() {
  const [cursor, setCursor] = useState(0);
  const berryList = getListBerry({
    key: ['getListBerry'],
    limit: 10,
    offset: cursor,
  });

  const berries = (berryList?.data || {}) as ListBerryDataResponse;

  const handleNext = () => {
    setCursor(cursor + 10);
  };

  const handlePrev = () => {
    setCursor(cursor - 10);
  };

  useEffect(() => {
    berryList.refetch();
  }, [berryList, cursor]);

  return (
    <View style={styles.container}>
      <View style={styles.base}>
        {berries?.results?.map((berry: any) => {
          return <BerryItem name={berry.name} key={berry.name} />;
        })}
      </View>
      <View>
        {berries.previous && (
          <TouchableOpacity onPress={() => handlePrev()}>
            <TextView>Prev</TextView>
          </TouchableOpacity>
        )}
        {berries.next && (
          <TouchableOpacity onPress={() => handleNext()}>
            <TextView>Next</TextView>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  base: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    rowGap: 16,
  },
});
