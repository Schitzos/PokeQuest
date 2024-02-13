import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {getBerryDetail, getListBerry} from '@/services/berry/berry.service';
import BerryItem, {BerryItemDetailDataResponse} from '../BerryItem';
import {TouchableOpacity} from 'react-native-gesture-handler';
import TextView from '@/components/TextView';
import theme from '@/theme';
import FastImage from 'react-native-fast-image';
import Button from '@/components/Button';

export interface ListBerryDataResponse {
  results: any;
  previous: string | null;
  next: string | null;
}

export default function ListBerry({
  labeled = true,
  handleAction,
}: {
  labeled?: boolean;
  handleAction: (data: any) => void;
}) {
  const [cursor, setCursor] = useState(0);
  const [selectedBerry, setSelectedBerry] = useState<null | string>();
  const berryList = getListBerry({
    key: ['getListBerry'],
    limit: 9,
    offset: cursor,
  });

  const berries = (berryList?.data || {}) as ListBerryDataResponse;

  const berryItemDetail = getBerryDetail({
    key: ['getBerryDetail', selectedBerry || ''],
    name: selectedBerry || '',
  });

  const berryDetail = (berryItemDetail.data ||
    {}) as BerryItemDetailDataResponse;

  const handleNext = () => {
    setCursor(cursor + 10);
  };

  const handlePrev = () => {
    setCursor(cursor - 10);
  };

  const handleSelectBerry = (val: any) => {
    setSelectedBerry(val);
  };

  useEffect(() => {
    berryList.refetch();
  }, [berryList, cursor]);

  return (
    <View style={styles.container}>
      {labeled && (
        <View style={styles.labeled}>
          <TextView fz={16} color={theme.colors.neutral500}>
            Berries List:
          </TextView>
        </View>
      )}
      <View style={styles.berryContainer}>
        <View style={styles.berryList}>
          {berries?.results?.map((berry: any) => {
            return (
              <BerryItem
                name={berry.name}
                key={berry.name}
                handleSelectBerry={handleSelectBerry}
                selectedBerry={selectedBerry}
              />
            );
          })}
          <View style={styles.pagination}>
            <TouchableOpacity
              onPress={() => handlePrev()}
              disabled={berries.previous ? false : true}>
              <TextView fz={10}>{'< Prev'}</TextView>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleNext()}
              disabled={berries.next ? false : true}>
              <TextView fz={10}>{'Next >'}</TextView>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.berryDetail}>
          <TextView>{selectedBerry ? selectedBerry : 'Select Berry'}</TextView>
          <FastImage
            style={styles.berryArt}
            source={{
              uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${selectedBerry}-berry.png`,
            }}
          />
          {selectedBerry && (
            <View>
              <View style={styles.flexRow}>
                <TextView fz={10} customStyle={styles.customInfoStyles}>
                  Firmness
                </TextView>
                <TextView fz={10} customStyle={styles.customStyles}>
                  : {berryDetail?.firmness?.name}
                </TextView>
              </View>
              <Button
                size="sm"
                onPress={() =>
                  handleAction({
                    berryName: selectedBerry,
                    berryFirmness: berryDetail?.firmness?.name,
                  })
                }
                disabled={berryItemDetail.isFetching}
                customStyle={styles.customButton}>
                Feed Pokémon
              </Button>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 16,
  },
  labeled: {
    padding: 16,
  },
  berryContainer: {
    flex: 1,
    flexDirection: 'row',
    gap: 8,
  },
  berryList: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  berryDetail: {
    width: '45%',
    padding: 8,
    gap: 4,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.neutral500,
    borderRadius: 16,
    marginTop: -16,
    justifyContent: 'center',
  },
  pagination: {
    flexDirection: 'row',
    padding: 4,
    gap: 8,
    width: '100%',
    justifyContent: 'space-between',
  },
  flexRow: {
    flexDirection: 'row',
    gap: 4,
    flexWrap: 'wrap',
    width: '100%',
  },
  customInfoStyles: {
    width: '40%',
  },
  customStyles: {
    flex: 1,
  },
  berryArt: {
    width: 48,
    height: 48,
  },
  customButton: {
    marginTop: 8,
  },
});
