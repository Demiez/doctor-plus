import * as createPalette from '@material-ui/core/styles/createPalette';

declare module '@material-ui/core/styles/createPalette' {
  interface Palette {
    openTitle?: string;
  }

  interface PaletteOptions {
    openTitle?: string;
    projectedTitle?: string;
  }
}
