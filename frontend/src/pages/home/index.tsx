import {
    Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
} from "@/components/ui/card";

export const Home = () => {
    return (
        <div className="ml-7 mr-7 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="h-80">
                <CardHeader>
                    <CardTitle>Card Title 1</CardTitle>
                    <CardDescription>Card Description 1</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Card Content 1</p>
                </CardContent>
                <CardFooter>
                    <p>Card Footer 1</p>
                </CardFooter>
            </Card>

            <Card className="h-80">
                <CardHeader>
                    <CardTitle>Card Title 2</CardTitle>
                    <CardDescription>Card Description 2</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Card Content 2</p>
                </CardContent>
                <CardFooter>
                    <p>Card Footer 2</p>
                </CardFooter>
            </Card>

            <Card className="h-80">
                <CardHeader>
                    <CardTitle>Card Title 3</CardTitle>
                    <CardDescription>Card Description 3</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Card Content 3</p>
                </CardContent>
                <CardFooter>
                    <p>Card Footer 3</p>
                </CardFooter>
            </Card>


            <Card className="h-80">
                <CardHeader>
                    <CardTitle>Card Title 4</CardTitle>
                    <CardDescription>Card Description 4</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Card Content 4</p>
                </CardContent>
                <CardFooter>
                    <p>Card Footer 4</p>
                </CardFooter>
            </Card>

            <Card className="h-80">
                <CardHeader>
                    <CardTitle>Card Title 5</CardTitle>
                    <CardDescription>Card Description 5</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Card Content 5</p>
                </CardContent>
                <CardFooter>
                    <p>Card Footer 5</p>
                </CardFooter>
            </Card>

            <Card className="h-80">
                <CardHeader>
                    <CardTitle>Card Title 6</CardTitle>
                    <CardDescription>Card Description 6</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Card Content 6</p>
                </CardContent>
                <CardFooter>
                    <p>Card Footer 6</p>
                </CardFooter>
            </Card>
        </div>
    );
};
