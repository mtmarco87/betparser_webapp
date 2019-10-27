export class SharedUtils {
    public static sprintf(...args: any[]) {
        // The string containing the format items (e.g. "{0}")
        // will and always has to be the first argument.
        var theString = args[0];

        // start with the second argument (i = 1)
        for (var i = 1; i < args.length; i++) {
            // "gm" = RegEx options for Global search (more than one instance)
            // and for Multiline search
            var regEx = new RegExp("\\{" + (i - 1) + "\\}", "gm");
            theString = theString.replace(regEx, args[i]);
        }

        return theString;
    }
}
