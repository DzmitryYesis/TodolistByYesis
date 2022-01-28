describe('InputForAdd', () => {
    it('Test for InputForAdd component', async () => {
        await
            page.goto('http://localhost:9009/iframe.html?id=todolist-inputforadd--input-for-add-primary&args=&viewMode=story');
        const image = await page.screenshot();
        expect(image).toMatchImageSnapshot();
    });
});


describe('SpanChangeTitle', () => {
    it('Test for SpanChangeTitle component', async () => {
        await
            page.goto('http://localhost:9009/iframe.html?id=todolist-spanchangetitle--span-change-title-primary&args=&viewMode=story');
        const image = await page.screenshot();
        expect(image).toMatchImageSnapshot();
    });
});

describe('TaskIsDone', () => {
    it('Test for TaskIsDone component', async () => {
        await
            page.goto('http://localhost:9009/iframe.html?id=todolist-task--task-is-done-primary&args=&viewMode=story');
        const image = await page.screenshot();
        expect(image).toMatchImageSnapshot();
    });
});

describe('TaskNotIsDone', () => {
    it('Test for TaskNotIsDone component', async () => {
        await
            page.goto('http://localhost:9009/iframe.html?id=todolist-task--task-not-is-done-primary&args=&viewMode=story');
        const image = await page.screenshot();
        expect(image).toMatchImageSnapshot();
    });
});

describe('AppWithRedux', () => {
    it('Test for AppWithRedux component', async () => {
        await
            page.goto('http://localhost:9009/iframe.html?id=todolist-appwithredux--app-with-redux-primary&args=&viewMode=story');
        const image = await page.screenshot();
        expect(image).toMatchImageSnapshot();
    });
});