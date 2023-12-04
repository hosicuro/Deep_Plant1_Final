import { computeCurrentDate } from "../../components/DataDetailPage/computePeriod";
import { apiIP } from "../../config";

// 처리육 수정 POST API
export default async function updateProcessedData(processedInput,processed_data,processedMinute, i, id, userId, createdDate,elapsedHour ){
    const [yy,mm,dd] = computeCurrentDate();

    //request body에 보낼 데이터 전처리 
    let req = (processedInput);
    req = {
        ...req,
        ['id']: id,
        ['createdAt'] : createdDate,
        ['userId'] : userId,
        ['seqno'] : i+1,
        ['period'] : Math.round(elapsedHour),
        ['deepAging'] : {
            ['date'] : processed_data?processed_data['deepaging_data']['date']: yy+mm+dd,
            ['minute'] : Number(processedMinute?processedMinute:0),
        },
        
    }
    req && delete req['deepaging_data']
        

    ///meat/add/deep_aging_data로 처리육 수정 데이터 API 전송 
    try{
        const response = await fetch(`http://${apiIP}/meat/add/sensory_eval`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
        });
        if (!response.ok) {
            throw new Error('sensory_eval 서버에서 응답 코드가 성공(2xx)이 아닙니다.');
        }
        // 서버에서 받은 JSON 응답 데이터를 parse
        const responseData = await response.json(); 
        return responseData;
    }catch(err){
        console.log('error')
        console.error(err);
    }
}