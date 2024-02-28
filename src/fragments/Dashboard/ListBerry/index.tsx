import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Animated,
  Image,
} from 'react-native';
import {getBerryDetail, getListBerry} from '@/services/berry/berry.service';
import BerryItem, {BerryItemDetailDataResponse} from '../BerryItem';
import {
  PanGestureHandler,
  State,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import TextView from '@/components/TextView';
import FastImage from 'react-native-fast-image';
import Skeleton from '@/components/Skeleton';
import {usePokemon} from '@/hooks/usePokemon';
import {berryFirmnessHeightScale} from '@/utils/berry';

export interface ListBerryDataResponse {
  results: any;
  count: number;
  previous: string | null;
  next: string | null;
}
const ITEMS_PER_PAGE = 9;

export default function ListBerry() {
  const [selectedBerry, setSelectedBerry] = useState<null | string>();
  const [currentPage, setCurrentPage] = useState(1);
  const [visibleBerries, setVisibleBerries] = useState([]);
  const {pokemon, setPokemon} = usePokemon();

  const berryList = getListBerry({
    key: ['getListBerry'],
    limit: 100,
  });

  const berries = (berryList?.data || {}) as ListBerryDataResponse;

  const berryItemDetail = getBerryDetail({
    key: ['getBerryDetail', selectedBerry || ''],
    name: selectedBerry || '',
  });

  const berryDetail = (berryItemDetail.data ||
    {}) as BerryItemDetailDataResponse;

  const handleNext = () => {
    if (currentPage < Math.ceil(berries.count / ITEMS_PER_PAGE)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSelectBerry = (val: any) => {
    setSelectedBerry(val);
  };

  useEffect(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const berriesToShow = berries?.results?.slice(startIndex, endIndex);
    setVisibleBerries(berriesToShow);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, berryList.data]);

  const translateY = new Animated.Value(0);
  const translateX = new Animated.Value(0);
  let offset = {x: 0, y: 0};

  const onGestureEvent = Animated.event(
    [
      {
        nativeEvent: {
          translationX: translateX,
          translationY: translateY,
        },
      },
    ],
    {useNativeDriver: true},
  );

  const onHandlerStateChange = (event: any) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      offset.x += event.nativeEvent.translationX;
      offset.y += event.nativeEvent.translationY;
      translateX.setOffset(offset.x);
      translateY.setOffset(offset.y);
      translateX.setValue(0);
      translateY.setValue(0);
    }

    if (
      event.nativeEvent.state === State.END &&
      event.nativeEvent.translationY <= -150
    ) {
      handleFeed({
        berryName: selectedBerry,
        berryFirmness: berryDetail?.firmness?.name,
      });
      offset = {x: 0, y: 0};
      translateX.setOffset(0);
      translateY.setOffset(0);
      translateX.setValue(0);
      translateY.setValue(0);
    }

    if (
      event.nativeEvent.state === State.END &&
      event.nativeEvent.translationY >= -150
    ) {
      offset = {x: 0, y: 0};
      translateX.setOffset(0);
      translateY.setOffset(0);
      translateX.setValue(0);
      translateY.setValue(0);
    }
  };

  const handleFeed = (val: any) => {
    let heightCalculate;
    if (
      !pokemon.selected.prevBerry ||
      pokemon.selected.prevBerry !== val.berryFirmness
    ) {
      heightCalculate =
        pokemon.selected.currentExp +
        berryFirmnessHeightScale[val.berryFirmness];
    } else {
      heightCalculate =
        pokemon.selected.currentExp -
        berryFirmnessHeightScale[val.berryFirmness] * 2;
    }

    const temp = {
      detail: pokemon.detail,
      species: pokemon.species,
      evolve: pokemon.evolve,
      selected: {
        ...pokemon.selected,
        currentExp: heightCalculate <= 0 ? 0 : heightCalculate,
        prevExp: pokemon.selected.currentExp,
        prevBerry: val.berryFirmness,
      },
    };
    setPokemon(temp);
  };

  return (
    <View style={styles.berryContainer}>
      <View style={styles.berryList}>
        {berryList.isFetching && (
          <View style={styles.skeletonContainer}>
            <Skeleton height={24} />
            <Skeleton height={24} />
            <Skeleton height={24} />
          </View>
        )}
        {!berryList.isFetching &&
          visibleBerries?.map((berry: any) => {
            return (
              <BerryItem
                name={berry.name}
                key={berry.name}
                handleSelectBerry={handleSelectBerry}
                selectedBerry={selectedBerry}
              />
            );
          })}
        {!berryList.isFetching && (
          <View style={styles.pagination}>
            <TouchableOpacity
              onPress={() => handlePrev()}
              disabled={currentPage === 1}>
              <TextView fz={10}>{'< Prev'}</TextView>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleNext()}
              disabled={
                currentPage === Math.ceil(berries?.count / ITEMS_PER_PAGE)
              }>
              <TextView fz={10}>{'Next >'}</TextView>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <FastImage
        source={require('@assets/images/stat-frame.png')}
        style={styles.berryDetail}
        defaultSource={require('@assets/images/default_image_loading.png')}
        resizeMode={FastImage.resizeMode.stretch}>
        <TextView>{selectedBerry ? selectedBerry : 'Select Berry'}</TextView>
        {selectedBerry && (
          <View style={styles.flexRow}>
            <TextView
              fz={10}
              // customStyle={styles.customInfoStyles}
              align="center">
              Firmness
            </TextView>
            <TextView
              fz={10}
              // customStyle={styles.customStyles}
              align="center">
              :{' '}
              {berryItemDetail.isFetching ? (
                <ActivityIndicator style={styles.cusLoading} />
              ) : (
                berryDetail?.firmness?.name
              )}
            </TextView>
          </View>
        )}
      </FastImage>
      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onHandlerStateChange}>
        <Animated.View
          style={[
            {transform: [{translateY: translateY}, {translateX: translateX}]},
          ]}>
          <Image
            style={styles.berryArt}
            source={{
              uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${selectedBerry}-berry.png`,
            }}
          />
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 16,
    zIndex: 1000,
    width: '100%',
    position: 'absolute',
    left: 16,
  },
  labeled: {
    padding: 16,
  },
  berryContainer: {
    flex: 1,
    flexDirection: 'row',
    gap: 8,
    paddingRight: 8,
    position: 'absolute',
    top: 48,
    height: 120,
    width: '100%',
  },
  berryList: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  berryDetail: {
    width: '45%',
    height: '130%',
    padding: 8,
    paddingTop: 24,
    gap: 72,
    alignItems: 'center',
    borderRadius: 16,
    marginTop: -16,
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
    flexWrap: 'wrap',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  customInfoStyles: {
    width: '40%',
  },
  customStyles: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  berryArt: {
    width: 72,
    height: 72,
    zIndex: 1000,
    position: 'absolute',
    right: 52,
    top: 24,
  },
  customButton: {
    marginTop: 8,
  },
  loadingBerry: {
    gap: 4,
    width: '100%',
    paddingHorizontal: 16,
  },
  cusLoading: {
    width: 12,
    height: 12,
  },
  skeletonContainer: {
    gap: 16,
    width: '100%',
  },
  expPoint: {
    zIndex: 4000,
    position: 'absolute',
    top: -200,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 8,
    borderRadius: 16,
    left: 250,
  },
});
