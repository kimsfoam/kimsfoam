export const TeamCeoContainer = () => {
  return (
    <section className="w-full">
      <div className="padding-outer flex w-full flex-col items-center justify-start gap-y-2">
        <div className="flex w-full max-w-7xl flex-col items-center justify-start gap-y-2">
          <h2 className="text-text-black pb-[clamp(0.5rem,0.5rem+2vw,2rem)] font-extrabold">
            대표 인사말
          </h2>
          <p className="text-description text-text-gray text-break">
            {`안녕하세요, 킴스폼 대표 김준민입니다.
            
            저희 킴스폼은 우레탄폼 단열 시공을 전문으로 하는 업체로 주택, 상가, 창고, 냉동시설까지 다양한 현장에서 풍부한 경험과 노하우를 쌓아왔습니다.
            
            정직한 견적과 정확한 시공을 원칙으로 하며, 시공이 완료된 이후에도 2년간 무상A/S를 제공해 끝까지 책임지는 단열 파트너가 되겠습니다.
            
            킴스폼은 단열재 선택부터 시공 과정, 마무리 청소까지 작은 부분 하나 놓치지 않고 꼼꼼하게 관리합니다. 사계절 쾌적하고 안전한 공간을 만드는 것이 저희의 사명입니다.`}
          </p>
        </div>
      </div>
    </section>
  );
};
