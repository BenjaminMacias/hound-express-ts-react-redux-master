import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Guide } from "../interfaces/Guide"; 

interface GuidesState {
  guides: Guide[];
  query: string;
  selectedGuideNumber: string | null;
  isHistoryModalOpen: boolean;
}

const initialState: GuidesState = {
  guides: [],
  query: "",
  selectedGuideNumber: null,
  isHistoryModalOpen: false,
};

const guidesSlice = createSlice({
  name: "guides",
  initialState,
  reducers: {
    addGuide: (state, action: PayloadAction<Guide>) => {
      const creationDate = action.payload.creationDate;

      state.guides.push({
        ...action.payload,
        history: [
          {
            date: creationDate,
            status: "Pendiente",
            location: "Registro inicial",
            notes: "Guía registrada en el sistema",
          },
        ],
      });
    },

    updateGuideStatus: (state, action: PayloadAction<{ id: string }>) => {
      const guide = state.guides.find((g) => g.id === action.payload.id);
      if (guide) {
        let newStatus: Guide["status"];

        switch (guide.status) {
          case "Pendiente":
            newStatus = "En tránsito";
            break;
          case "En tránsito":
            newStatus = "Entregado";
            break;
          case "Entregado":
            return;
        }

        guide.status = newStatus;
        const date = new Date().toISOString().split("T")[0];
        guide.lastUpdate = date;
        guide.history.push({
          date,
          status: newStatus,
          location: "Ubicación automática",
          notes: "Cambio de estado desde botón Actualizar",
        });
      }
    },

    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    setSelectedGuide: (state, action: PayloadAction<string | null>) => {
      state.selectedGuideNumber = action.payload;
    },
    setHistoryModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isHistoryModalOpen = action.payload;
    },
  },
});

export const {
  addGuide,
  updateGuideStatus,
  setQuery,
  setSelectedGuide,
  setHistoryModalOpen,
} = guidesSlice.actions;

export default guidesSlice.reducer;
