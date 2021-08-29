import React from 'react'
import Message from "./Message";

const messages = [
    { id: 1, name: "Dracarys", message: "Lorem Ipsum, dizgi ve baskı endüstrisinde kullanılan mıgır metinlerdir. Lorem Ipsum, adı bilinmeyen bir matbaacının bir hurufat numune kitabı oluşturmak üzere bir yazı galerisini alarak karıştırdığı 1500'lerden beri endüstri standardı sahte metinler olarak kullanılmıştır. Beşyüz yıl boyunca varlığını sürdürmekle kalmamış, aynı zamanda pek değişmeden elektronik dizgiye de sıçramıştır." },
    { id: 2, name: "Muhammed", message: "1960'larda Lorem Ipsum pasajları da içeren Letraset yapraklarının yayınlanması ile ve yakın zamanda Aldus PageMaker gibi Lorem Ipsum sürümleri içeren masaüstü yayıncılık yazılımları ile popüler olmuştur." },
    { id: 3, name: "Fuat", message: "Yaygın inancın tersine, Lorem Ipsum rastgele sözcüklerden oluşmaz. Kökleri M.Ö. 45 tarihinden bu yana klasik Latin edebiyatına kadar uzanan 2000 yıllık bir geçmişi vardır. Virginia'daki Hampden-Sydney College'dan Latince profesörü Richard McClintock, bir Lorem Ipsum pasajında geçen ve anlaşılması en güç sözcüklerden biri olan 'consectetur' sözcüğünün klasik edebiyattaki örneklerini incelediğinde kesin bir kaynağa ulaşmıştır." },
    { id: 4, name: "Elif", message: "Lorm Ipsum, Çiçero tarafından M.Ö. 45 tarihinde kaleme alınan de Finibus Bonorum et Malorum (İyi ve Kötünün Uç Sınırları) eserinin 1.10.32 ve 1.10.33 sayılı bölümlerinden gelmektedir. Bu kitap, ahlak kuramı üzerine bir tezdir ve Rönesans döneminde çok popüler olmuştur. Lorem Ipsum pasajının ilk satırı olan 1.10.32 sayılı bölümdeki bir satırdan gelmektedir." }
]

const Comment = () => {
    return (
        <>
            <div className="mt-4 pl-4 mb-4 h-full border-gray rounded-md overflow-auto">
                <Message name={"Dracarys"} message={"Merhaba tailwindcss ile react"} />
                <Message name={"Muhammed"} message={"Merhaba tailwindcss ile react"} />
                <Message name={"Elif"} message={"Merhaba tailwindcss ile react"} />
                <Message name={"Gönül"} message={"Merhaba tailwindcss ile react"} />
                {messages.map(message => (
                    <Message key={message.id} name={message.name} message={message.message} />
                ))}
            </div>
            {/* Input Send Message */}
            <div className="flex-auto flex justify-end items-end">
                <button className="border text-center rounded-md p-2 text-gray-700 hover:text-gray-600 mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                </button>
                <input className=" w-full  shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="message" type="text" placeholder="Genel kanalına mesaj gönder." />
            </div>
        </>
    )
}

export default Comment
