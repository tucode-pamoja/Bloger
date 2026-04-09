// 백엔드 AI 텍스트 생성 API를 흉내 내는 Mock 함수
// 실제 애플리케이션에서는 fetch나 axios를 통해 서버(ChatGPT API 등)로 요청합니다.

export const generateReviewMockAPI = async ({ category, keywords, imageCount }) => {
    return new Promise((resolve) => {
        // 실제 AI 생성처럼 약간의 딜레이를 줍니다. (1.5 ~ 2.5초)
        const delay = Math.random() * 1000 + 1500;

        setTimeout(() => {
            let result = '';

            const baseKeywords = keywords ? keywords : '(입력 키워드 없음)';

            switch (category) {
                case 'restaurant':
                    result = `안녕하세요! 오늘은 맛있는 한 끼를 위해 방문한 곳에 대한 솔직한 후기를 남겨볼까 해요.\n\n제가 방문했을 때 인상 깊었던 점은 바로 "${baseKeywords}" 였습니다. 기대 이상으로 만족스러운 식사였어요!`;
                    if (imageCount > 0) result += `\n같이 첨부한 ${imageCount}장의 사진에서도 맛있는 분위기가 느껴지시죠? :)`;
                    result += `\n\n직원분들도 정말 친절하셨고, 다음에는 가족들이나 친구들과 함께 꼭 다시 오고 싶습니다. 주변에 계시다면 여러분도 꼭 한 번 방문해 보세요! 😋`;
                    break;

                case 'cafe':
                    result = `주말을 맞아 여유로운 분위기를 즐기고자 동네 예쁜 카페에 다녀왔습니다 ☕️.\n\n특히 기억에 남는 부분은 "${baseKeywords}" 인데요! 조용하고 아늑한 공간이라 머무는 내내 힐링하는 기분이었습니다.`;
                    if (imageCount > 0) result += `\n제가 담아온 ${imageCount}장의 사진을 보시면 아시겠지만 채광이나 인테리어도 너무 감각적이에요.`;
                    result += `\n\n커피 향도 훌륭하고 디저트도 완벽했습니다. 다음 주말 도심 속 휴식이 필요할 때 다시 들를 예정입니다!`;
                    break;

                case 'beauty':
                    result = `오랜만에 기분 전환을 위해 헤어/뷰티샵을 찾았습니다 💇‍♀️.\n\n상담부터 시술까지 세심하게 관리해주셨는데, 제가 원했던 "${baseKeywords}" 스타일로 꼼꼼하게 맞춰주셔서 너무 감사했어요.`;
                    if (imageCount > 0) result += `\n비포 애프터를 비교하려고 ${imageCount}장의 사진을 찍어보았는데 어떤가요? 확실히 달라졌죠!`;
                    result += `\n\n스타일링 꿀팁도 자세히 알려주시고, 전체적으로 너무 만족스러운 경험이었습니다. 머리 모양 바꿀 때 적극 추천합니다!`;
                    break;

                default:
                    result = `최근 인상 깊게 다녀온 곳에 대한 방문 후기입니다!\n\n무엇보다 "${baseKeywords}" 같은 점들이 가장 만족스러웠어요. 기분 좋게 다녀와서 남들한테도 꼭 추천하고 싶네요.`;
                    if (imageCount > 0) result += `\n참고하실 수 있도록 찍어온 ${imageCount}장의 사진도 함께 올려둡니다.`;
                    result += `\n\n다음에도 기회가 된다면 꼭 다시 방문할 생각입니다! 도움이 되셨길 바랄게요 👍`;
                    break;
            }

            resolve(result);
        }, delay);
    });
};
