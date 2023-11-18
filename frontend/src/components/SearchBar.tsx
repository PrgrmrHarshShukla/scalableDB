import '@fortawesome/fontawesome-free/css/all.css'

function SearchBar() {
    return(
        <div className="w-screen h-[10vh] flex flex-row justify-center items-center">
            <input type="text" className=" px-2 text-black w-[80vw] sm:w-[60vw] h-[5vh] border-2 border-white rounded-tl-[10px] rounded-bl-[10px] bg-gray-400" />
            <div className="w-12 h-[5vh] bg-gray-600 hover:bg-gray-700 flex flex-row justify-center items-center border-2 border-white rounded-tr-[10px] rounded-br-[10px]">
                <i className="fas fa-search text-white"></i>
            </div>            
        </div>
    )
}

export default SearchBar