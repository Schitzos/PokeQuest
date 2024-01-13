const colors = {
  primary: '#00AFF0',
  primary50: '#E6F7FE',
  primary100: '#B0E6FA',
  primary200: '#8ADAF8',
  primary600: '#009FDA',
  error: '#FF4267',
  error50: '#FFECF0',
  warning: '#FB6B18',
  warning50: '#FFF0E8',
  success: '#52D5BA',
  success50: '#EEFBF8',
  success100: '#C9F2EA',
  black: '#121212',
  black50: 'rgba(18, 18, 18, 0.5)',
  white: '#FFFFFF',
  neutral50: '#F6F6F6',
  neutral100: '#E0E0E0',
  neutral200: '#D1D1D1',
  neutral300: '#EEEEEE',
  neutral400: '#B0B0B0',
  neutral500: '#6D6D6D',
};

const iosShadow = `
    shadow-color: rgba(18, 18, 18, 0.10);
    shadow-offset: 0px 2px;
    shadow-opacity: 1;
    shadow-radius: 4px;
  `;

const androidShadow = `
    elevation: 1; 
    shadow-offset: 0px 2px;
    shadow-opacity: 0.2;
    shadow-radius: 4px;
    shadow: 0px 2px 4px  #0060841a;
  `;

const font = {
  reguler: 'PixeloidMono',
  bold: 'PixeloidSans-Bold',
  regularMine: 'Minecraftia-Regular',
};

export default {
  colors,
  iosShadow,
  androidShadow,
  font,
};
