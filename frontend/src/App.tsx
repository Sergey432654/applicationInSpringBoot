
import './App.css'
import { useQuery } from '@tanstack/react-query';
import { fetchAssets } from './api/Api.ts';
import type { Asset } from './type/Asset.ts';
import Header from "./components/Header/Header.tsx";

function App() {
  const{data} = useQuery({
    queryKey:['assets'],
    queryFn: fetchAssets
  })
  return (
    <div className="bg-sky-200 h-screen">
      <Header/>
      <div>
        <h1 className="text-center">_-_</h1>
          <div className="flex justify-center">
            <ul>
              {data && data.length > 0 ? (
                  data.map((asset: Asset) => (
                      <li key={asset.id} className="flex text-lg">
                        {asset.symbol} — {asset.profit}$ (К-сть: {asset.quantity})
                      </li>
                  ))
                ) : (
                <li></li>
                )}
            </ul>
          </div>
        </div>
    </div>
  )
}

export default App
