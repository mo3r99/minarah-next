import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils/utils";

export default function Modal({className, children, action, title, buttonText}:{className?: string | null, children: ReactNode, title: string, action: () => void, buttonText: string}) {
    return (
        <div className={cn("fixed inset-0 bg-opacity-50 flex items-center justify-center w-[80vw] max-w-xl mx-auto", className)}>
          <Card>
            <CardHeader>
              <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                {children}
              </div>
            </CardContent>
            <CardFooter>
                <Button className="cursor-pointer" onClick={() => {action()}}>
                    {buttonText}
                </Button>
            </CardFooter>
          </Card>
        </div>
    )
}