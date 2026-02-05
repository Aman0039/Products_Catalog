import Searchbar from './Searchbar'
import ProductCard from './ProductCard'
import Footer from './Footer'
import Catalog from '../pages/Catalog'

const Home = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
            <main className="flex-1 w-full flex items-start justify-center py-12 px-4">
                <div className="w-full max-w-5xl rounded-xl p-6">
                    <header className="text-center">
                        <h1 className="text-3xl md:text-4xl font-semibold text-gray-900">Products Catalog</h1>
                        <div className="mt-3 border-t border-gray-200 w-16 mx-auto" />
                        <p className="mt-4 text-sm text-gray-600 max-w-xl mx-auto">Top devices, honest prices — phones, laptops, accessories.</p>
                    </header>
                    <section>
                        <Catalog/>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    )
}

export default Home