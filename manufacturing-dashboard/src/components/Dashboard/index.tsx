import * as React from 'react';
import {useTheme} from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import {LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer} from 'recharts';
import {Container} from "@mui/material";

// Generate Sales Data
function createData(time: string, amount?: number) {
    return {time, amount};
}

const data = [
    createData('00:00', 0),
    createData('03:00', 300),
    createData('06:00', 600),
    createData('09:00', 800),
    createData('12:00', 1500),
    createData('15:00', 2000),
    createData('18:00', 2400),
    createData('21:00', 2400),
    createData('24:00', undefined),
];

export default function Dashboard() {
    const theme = useTheme();

    return (
        <React.Fragment>
            <Container>
                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                    Chart
                </Typography>
                <ResponsiveContainer>
                    <LineChart
                        data={data}
                        margin={{
                            top: 16,
                            right: 16,
                            bottom: 0,
                            left: 24,
                        }}
                    >
                        <XAxis
                            dataKey="time"
                            stroke={theme.palette.text.secondary}
                            style={theme.typography.body2}
                        />
                        <YAxis
                            stroke={theme.palette.text.secondary}
                            style={theme.typography.body2}
                        >
                            <Label
                                angle={270}
                                position="left"
                                style={{
                                    textAnchor: 'middle',
                                    fill: theme.palette.text.primary,
                                    ...theme.typography.body1,
                                }}
                            >
                                Sales ($)
                            </Label>
                        </YAxis>
                        <Line
                            isAnimationActive={false}
                            type="monotone"
                            dataKey="amount"
                            stroke={theme.palette.primary.main}
                            dot={false}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </Container>
        </React.Fragment>
    );
}