<template>
    <div style="display: flex;">
        <div style="flex:1;">
            <f-menu-list :data="data1" defaultActive="1" name="a" index="b" icon="c" children="d" @changeItem="changeItem" />
        </div>
        <div style="flex:1;">
            <f-infinite-menu :data="data2" defaultActive="2" name="a" index="b" icon="c" children="d" @changeItem="changeItem"></f-infinite-menu>
        </div>
    </div>
</template>
    
<script lang='ts' setup>
    const data1 = [
            {
                a: '导航1',
                b: '1',
                c: 'Document'
            },
            {
                a: '导航2',
                b: '2',
                c: 'Document'
            },
            {
                a: '导航3',
                b: '3',
                c: 'Document',
                d: [
                {
                    a: '导航3-1',
                    b: '3-1',
                    c: 'Document',
                }
                ]
            }
        ],
        data2 = [
            {
                a: '导航1',
                b: '1',
                c: 'Document'
            },
            {
                a: '导航2',
                b: '2',
                c: 'Document'
            },
            {
                a: '导航3',
                b: '3',
                c: 'Document',
                d: [
                {
                    a: '导航3-1',
                    b: '3-1',
                    c: 'Document',
                    d: [
                    {
                        a: '导航3-1-1',
                        b: '3-1-1',
                        c: 'Document',
                        d: [
                        {
                            a: '导航3-1-1-1',
                            b: '3-1-1-1',
                            c: 'Document',
                            d: [
                            {
                                a: '导航3-1-1-1-1',
                                b: '3-1-1-1-1',
                                c: 'Document',
                            }
                            ]
                        }
                        ]
                    }
                    ]
                }
                ]
            }
        ];
    const changeItem = (item: any) => {
        console.log(item)
    }
</script>
    
<style lang='stylus' scoped></style>
    