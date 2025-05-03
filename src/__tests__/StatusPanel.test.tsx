import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import StatusPanel from "../components/StatusPanel";
import guidesReducer from "../store/guidesSlice";
import { Guide } from "../interfaces/Guide";

// Utilidad para renderizar el componente con un estado inicial simulado
const renderWithStore = (
  initialGuides: Guide[] = [],
  props: { total: number; inTransit: number; delivered: number }
) => {
  const store = configureStore({
    reducer: {
      guides: guidesReducer,
    },
    preloadedState: {
      guides: {
        guides: initialGuides,
        query: "",
        selectedGuideNumber: null,
        isHistoryModalOpen: false,
      },
    },
  });

  return render(
    <Provider store={store}>
      <StatusPanel {...props} />
    </Provider>
  );
};

describe("StatusPanel", () => {
  it("muestra correctamente los conteos", () => {
    const mockGuides: Guide[] = [
      { id: "1", status: "Pendiente", origin: "GDL", destination: "CDMX", recipient: "Benny", creationDate: "2025-04-17", lastUpdate: "2025-04-17", history: [] },
      { id: "2", status: "En tránsito", origin: "CDMX", destination: "MTY", recipient: "Amorcito", creationDate: "2025-04-16", lastUpdate: "2025-04-16", history: [] },
      { id: "3", status: "Entregado", origin: "MTY", destination: "QRO", recipient: "Benny", creationDate: "2025-04-15", lastUpdate: "2025-04-15", history: [] },
    ];

    renderWithStore(mockGuides, { total: 1, inTransit: 1, delivered: 1 });

    expect(screen.getByText(/Guías activas: 1/i)).toBeInTheDocument();
    expect(screen.getByText(/En tránsito: 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Entregadas: 1/i)).toBeInTheDocument();
  });

  it("muestra cero si no hay datos", () => {
    renderWithStore([], { total: 0, inTransit: 0, delivered: 0 });

    expect(screen.getByText(/Guías activas: 0/i)).toBeInTheDocument();
    expect(screen.getByText(/En tránsito: 0/i)).toBeInTheDocument();
    expect(screen.getByText(/Entregadas: 0/i)).toBeInTheDocument();
  });
});
