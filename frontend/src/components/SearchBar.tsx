import '@fortawesome/fontawesome-free/css/all.css'

function SearchBar() {
    return(
        <div className="w-screen h-auto flex flex-col justify-center items-center gap-4">
            <div className="w-screen h-[10vh] flex flex-row justify-center items-center">
                <input placeholder="Search" type="text" className="text-black px-2 text-black w-[80vw] sm:w-[60vw] h-[5vh] border-[2px] border-white rounded-tl-[10px] rounded-bl-[10px] bg-white" />
                <div className="cursor-pointer w-12 h-[5vh] bg-blue-600 hover:bg-blue-700 active:bg-blue-900 flex flex-row justify-center items-center border-[2px] border-white rounded-tr-[10px] rounded-br-[10px]">
                    <i className="fas fa-search text-white"></i>
                </div>            
            </div>

            <div className="w-screen h-auto flex flex-row justify-center items-center">
                <select className="pl-2 pb-[2px] h-[4vh] border-[2px] border-white rounded-bl-[10px] rounded-tl-[10px] bg-white">
                    <option>Select filter</option>
                    <option>level</option>
                    <option>message</option>
                    <option>resourceId</option>
                    <option>traceId</option>
                    <option>spanId</option>
                    <option>commit</option>
                    <option>metadata.parentResourceId</option>
                </select>
                <input type="text" placeholder="Filter value" className="pb-[2px] text-black h-[4vh] border-l-[2px] border-gray-800 rounded-br-[10px] rounded-tr-[10px] bg-white pl-2" />
                <div className="flex flex-row justify-center items-center cursor-pointer ml-20 border-[0.5px] border-white rounded-[10px] px-4 h-[4vh] bg-blue-600 hover:bg-blue-700 active:bg-blue-900 font-semibold">
                    Add Filter
                </div>
            </div>


        </div>
    )
}

export default SearchBar