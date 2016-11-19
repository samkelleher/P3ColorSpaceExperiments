import gm from 'gm';

const gmWithImageMagick = gm.subClass({ imageMagick: true });

export default gmWithImageMagick;
