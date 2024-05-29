import ViewLayout from "./layouts/ViewLayout";
import Home from "./layouts/home/Home";
import Search from "./layouts/search/Search";
import Nav from "./components/nav/Nav";
import { QueryClient, QueryClientProvider } from "react-query";
import useLocalStorage from "./service/hooks/useLocalStorage";
import AgeModal from "./components/ageModal/AgeModal";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  const [isAdult, setIsAdult] = useLocalStorage("isOfAge", false);

  if (!isAdult) {
    return <AgeModal handle={setIsAdult} />;
  }

  return (
    <div>
      <Nav />
      <ViewLayout color="#F3F2F2">
        <Home />
      </ViewLayout>
      <QueryClientProvider client={queryClient}>
        <ViewLayout height="auto" backGroundColor="#D1CFCF" color="#333030">
          <Search />
        </ViewLayout>
      </QueryClientProvider>
    </div>
  );
}

export default App;
