import { findByProps, findByName, findByStoreName } from "@vendetta/metro";
import { after } from "@vendetta/patcher";
import { ReactNative } from "@vendetta/metro/common";

const { Pressable } = findByProps("Button", "Text", "View");
const ProfileBanner = findByName("ProfileBanner", false);
const HeaderAvatar = findByName("HeaderAvatar", false);
const { openMediaModal } = findByProps("openMediaModal");
const { hideActionSheet } = findByProps("hideActionSheet");
const { getChannelId } = findByStoreName("SelectedChannelStore");
const { getGuildId } = findByStoreName("SelectedGuildStore");

function getImageSize(uri: string): Promise<{width: number, height: number}> {
    return new Promise((resolve, reject) => {
        ReactNative.Image.getSize(
        uri,
        (width, height) => resolve({width, height}),
        (error) => reject(error)
        );
    });
}

async function openModal(src: string, event) {
    const { width, height } = await getImageSize(src);

    hideActionSheet(); // hide user sheet
    openMediaModal({
        initialSources: [{
            uri: src,
            sourceURI: src,
            width,
            height,
            guildId: getGuildId(),
            channelId: getChannelId(),
        }],
        initialIndex: 0,
        originLayout: {
            width: 0, // this would ideally be the size of the small pfp but this proved very hard to implement
            height: 0,
            x: event.pageX,
            y: event.pageY,
            resizeMode: "fill",
        }
    });
}

const unpatchAvatar = after("default", HeaderAvatar, ([{ user, style, guildId }], res) => {
    var ext = "png";
    if (user.guildMemberAvatars[guildId].includes("a_")) {ext = "gif";}
    const guildSpecific = user.guildMemberAvatars?.[guildId] && `https://cdn.discordapp.com/guilds/${guildId}/users/${user.id}/avatars/${user.guildMemberAvatars[guildId]}.${ext}?size=4096`;
    const image = user?.getAvatarURL?.(false, 4096, true);
    if (!image) return res;

    console.log("Guild Specific Avatar: ", guildSpecific);

    const url =
        typeof image === "number"
            ? `https://cdn.discordapp.com/embed/avatars/${Number(BigInt(user.id) >> 22n) % 6}.png`
            : image?.replace(".webp", ".png");

    delete res.props.style;

    return (
        <Pressable
            onPress={({ nativeEvent }) => openModal(url, nativeEvent)}
            onLongPress={({ nativeEvent }) => guildSpecific && openModal(guildSpecific, nativeEvent)}
            style={style}>
            {res}
        </Pressable>
    );
});

const unpatchBanner = after("default", ProfileBanner, ([{ bannerSource }], res) => {
    if (typeof bannerSource?.uri !== "string" || !res) return res;

    const url = bannerSource.uri
        .replace(/(?:\?size=\d{3,4})?$/, "?size=4096")
        .replace(".webp", ".png");

    return <Pressable onPress={({ nativeEvent }) => openModal(url, nativeEvent)}>{res}</Pressable>;
});

var unpatchGuildIcon

if (typeof findByName("GuildIcon").prototype.render !== "undefined") {
    // Compatibility patch with older versions
    const GuildIcon = findByName("GuildIcon");
    unpatchGuildIcon = after("render", GuildIcon.prototype, function (_, res) {
        if (this.props?.size !== "XLARGE") return;
        const url = this.props?.guild?.getIconURL?.(4096);
        if (!url) return res;
      
        return (
            <Pressable onPress={({ nativeEvent }) => openModal(url, nativeEvent)}>
                {res}
            </Pressable>
        );
    });
} else {
    // Patch for newer versions
    const GuildIcon = findByName("GuildIcon", false);
    unpatchGuildIcon = after("default", GuildIcon, ([{ size, guild }], res) => {
        if (size !== "XLARGE" || guild?.icon == null) return;
        var ext = "png"
        if (guild?.icon.includes('a_')) { ext = "gif"; }
        const url = `https://cdn.discordapp.com/icons/${guild?.id}/${guild?.icon}.${ext}?size=4096`
    
        return (
            <Pressable onPress={({ nativeEvent }) => openModal(url, nativeEvent)}>
                {res}
            </Pressable>
        );
    });
}

export function onUnload() {
    unpatchAvatar();
    unpatchBanner();
    unpatchGuildIcon();
}
