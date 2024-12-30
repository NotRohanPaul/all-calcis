import CurrencyConverterBody from "./components/converter-body";
import { CurrencyConverterStateDispatchProvider } from "./context/provider";

const CurrencyConverterMain = () => {
  return (
    <CurrencyConverterStateDispatchProvider>
      <CurrencyConverterBody />
    </CurrencyConverterStateDispatchProvider>
  );
};

export default CurrencyConverterMain;
