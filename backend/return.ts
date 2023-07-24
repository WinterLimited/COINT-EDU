

class object2 {
    async nano(type: number) : Promise<number> {
        var ret: number;

        ret = 60 * type;

        return new Promise<number>(res => {
            res(ret);
        });
    }

    async field()
    {
        var ret: Promise<number>;

        ret = await this.nano(90);

        console.log(ret);
    }
}

new object2().field();
