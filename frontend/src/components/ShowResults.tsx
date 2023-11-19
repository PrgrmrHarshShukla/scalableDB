interface ReceivedPropTypes {
    level: String,
    message: String,
    timestamp: Date,
    resourceId: String,
    traceId: String,
    spanId: String,
    commit: String,
    metadata: {
        parentResourceId: String,
    }
}

interface ShowResultsProps {
    result: ReceivedPropTypes[]
}



const ShowResults: React.FC<ShowResultsProps> = ({ result }) => {
    const list = result.map((data, index) => {
        return (<div key={index} className="border-[1px] border-white rounded-[10px] w-full">
            <span>{`{
               level: ${data.level},
               message: ${data.message},
               timestamp: ${data.timestamp},
               resourceId: ${data.resourceId},
               traceId: ${data.traceId},
               spanId: ${data.spanId},
               commit: ${data.commit},
               metadata: {
                   parentResourceId: ${data.metadata.parentResourceId},
               } 
            }`}</span>
        </div>)
    })


    return(
        <div className="text-white font-semibold w-screen sm:w-[80vw] h-auto min-h-[60vh] flex flex-col justify-start items-center py-8 px-20 border-[1px] border-white rounded-[10px]" >

            {list}
            
        </div>
    )
}

export default ShowResults